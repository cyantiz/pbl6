import { IUserModel, adminGetAllUsers, banUser, promoteEditor, unbanUser } from '@/api/user.api';
import { ArrowUpOutlined, IssuesCloseOutlined, StopOutlined } from '@ant-design/icons';
import { Button, Image, Input, InputRef, Table, Tooltip } from 'antd';
import { ColumnType } from 'antd/es/table';
import { PaginationData } from 'rc-pagination';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export type AdminUserManagementPageProps = {
  // Define your props here if needed
};

const AdminUserManagementPage: FC<AdminUserManagementPageProps> = ({}) => {
  const [users, setUsers] = useState<IUserModel[]>([]);
  const [pagination, setPagination] = useState<Partial<PaginationData>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const searchRef = useRef<InputRef>(null);
  const fetchUsers = async (params?: { page?: number; pageSize?: number; searchName?: string }) => {
    try {
      setLoading(true);
      const { page = 1, pageSize = 10, searchName: partialName } = params || {};

      const resp = await adminGetAllUsers({ page, pageSize, partialName });

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
      render: (user) => (
        <span style={{ color: user.bannedAt ? 'red' : 'green' }}>
          {user.bannedAt ? 'Banned' : 'Active'}
        </span>
      ),
    },
    {
      title: 'Action',
      width: 120,
      align: 'center',
      render: (user) => (
        <div className="flex justify-between">
          <BanUserButton
            user={user}
            onFinished={() => {
              fetchUsers({
                page: pagination.current,
                pageSize: pagination.pageSize,
                searchName: searchRef.current?.input?.value,
              });
            }}
          />
          <PromoteEditorButton
            user={user}
            onPromoted={() => {
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

const BanUserButton = ({ user, onFinished }: { user: IUserModel; onFinished: () => void }) => {
  const handleBanUser = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ban user ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, ban this user!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await banUser(user.username);

          Swal.fire('Banned!', 'User has been banned.', 'success');
          onFinished();
        }
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    });
  };

  const handleUnbanUser = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to unban user ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unban this user!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await unbanUser(user.username);

          Swal.fire('Unbanned!', 'User has been unbanned.', 'success');
          onFinished();
        }
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    });
  };

  const banned = useMemo(() => !!user.bannedAt, [user.bannedAt]);

  return (
    <Tooltip title={banned ? 'Unban this user' : 'Ban user'}>
      <Button danger={!banned} onClick={banned ? handleUnbanUser : handleBanUser}>
        {banned ? <IssuesCloseOutlined /> : <StopOutlined />}
      </Button>
    </Tooltip>
  );
};

const PromoteEditorButton: FC<{ user: IUserModel; onPromoted: () => void }> = ({
  user,
  onPromoted,
}) => {
  const handlePromoteEditor = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to promote user ${user.name} to editor`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, promote this user!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await promoteEditor(user.username);

          Swal.fire('Promoted!', 'User has been promoted successfully.', 'success');
          onPromoted();
        }
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    });
  };
  return (
    <Tooltip title="Promote Editor">
      <Button type="primary" onClick={handlePromoteEditor}>
        <ArrowUpOutlined />
      </Button>
    </Tooltip>
  );
};

export default AdminUserManagementPage;
