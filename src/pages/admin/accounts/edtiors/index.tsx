import {
  IUserModel,
  adminGetAllEditors,
  banUser,
  removeEditorRights,
  unbanUser,
} from '@/api/user.api';
import { ArrowDownOutlined, IssuesCloseOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Image, Input, InputRef, Table, Tooltip } from 'antd';
import { ColumnType } from 'antd/es/table';
import { PaginationData } from 'rc-pagination';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export type AdminEditorManagementPageProps = {
  // Define your props here if needed
};

const AdminEditorManagementPage: FC<AdminEditorManagementPageProps> = ({}) => {
  const [users, setUsers] = useState<IUserModel[]>([]);
  const [pagination, setPagination] = useState<Partial<PaginationData>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const searchRef = useRef<InputRef>(null);
  const fetchUsers = async (params?: { page?: number; pageSize?: number; searchName?: string }) => {
    try {
      setLoading(true);
      const { page = 1, pageSize = 10, searchName: partialName } = params || {};

      const resp = await adminGetAllEditors({ page, pageSize, partialName });

      setUsers(resp.values);
      setPagination({
        pageSize: resp.pageSize,
        total: resp.total,
        current: resp.page,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const cols: ColumnType<IUserModel>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 72,
      align: 'center',
      render: (id) => <span>#{id}</span>,
    },
    {
      title: '',
      dataIndex: 'avatarUrl',
      width: 72,
      align: 'center',
      render: (avatarUrl) => (
        <div className="w-8 h-8 overflow-hidden rounded-full">
          <Image src={avatarUrl} width={'100%'} height={'100%'} className="object-cover" />,
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      width: 90,
      align: 'center',
      render: (user) => (
        <div className="w-full flex justify-center">
          <span
            className="text-white block w-[60px] py-1 rounded-full text-xs font-bold"
            style={{ background: user.bannedAt ? 'red' : 'green' }}
          >
            {user.bannedAt ? 'Banned' : 'Active'}
          </span>
        </div>
      ),
    },
    {
      title: 'Action',
      width: 120,
      align: 'center',
      render: (user) => (
        <div className="flex justify-between">
          <BanEditorButton
            user={user}
            onFinished={() => {
              fetchUsers({
                page: pagination.current,
                pageSize: pagination.pageSize,
                searchName: searchRef.current?.input?.value,
              });
            }}
          />
          <RemoveEditorRightsButton
            user={user}
            onFinished={() => {
              fetchUsers({
                page: pagination.current,
                pageSize: pagination.pageSize,
                searchName: searchRef.current?.input?.value,
              });
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h3 className="mb-4">User management</h3>
      <div>
        <div className="ml-auto w-96 mb-2">
          <Input.Search
            ref={searchRef}
            placeholder="Search by name"
            onSearch={(value) => {
              fetchUsers({
                page: pagination.current,
                pageSize: pagination.pageSize,
                searchName: value,
              });
            }}
          />
        </div>
        <Table
          size="small"
          bordered
          columns={cols}
          dataSource={users}
          loading={loading}
          pagination={{
            size: 'default',
            pageSize: pagination.pageSize,
            total: pagination.total,
            current: pagination.current,
            onChange: (page, pageSize) => {
              const searchName = searchRef.current?.input?.value;
              fetchUsers({ page, pageSize, searchName });
            },
          }}
        />
      </div>
    </div>
  );
};

const BanEditorButton = ({ user, onFinished }: { user: IUserModel; onFinished: () => void }) => {
  const handleBanEditor = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ban editor ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, ban this editor!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await banUser(user.username);

          Swal.fire('Banned!', 'Editor has been banned.', 'success');
          onFinished();
        }
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    });
  };

  const handleUnbanEditor = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to unban editor ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unban this editor!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await unbanUser(user.username);

          Swal.fire('Unbanned!', 'Editor has been unbanned.', 'success');
          onFinished();
        }
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    });
  };

  const banned = useMemo(() => !!user.bannedAt, [user.bannedAt]);

  return (
    <Tooltip title={banned ? 'Unban this editor' : 'Ban user'}>
      <Button danger={!banned} onClick={banned ? handleUnbanEditor : handleBanEditor}>
        {banned ? <IssuesCloseOutlined /> : <StopOutlined />}
      </Button>
    </Tooltip>
  );
};

const RemoveEditorRightsButton: FC<{ user: IUserModel; onFinished: () => void }> = ({
  user,
  onFinished,
}) => {
  const handleRemoveEditorRights = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to remove editor right of ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await removeEditorRights(user.username);

          Swal.fire('Promoted!', 'Editor right has been removed successfully.', 'success');
          onFinished();
        }
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    });
  };
  return (
    <Tooltip title="Remove editor rights">
      <Button type="primary" danger onClick={handleRemoveEditorRights}>
        <ArrowDownOutlined />
      </Button>
    </Tooltip>
  );
};

export default AdminEditorManagementPage;
