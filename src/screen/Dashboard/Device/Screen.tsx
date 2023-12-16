'use client'

import { Plus, Search } from 'lucide-react'

import Button from '@/components/Button'
import DataTable, { DataTableColumn } from '@/components/DataTable'
import Dialog from '@/components/Dialog'
import Input from '@/components/Input'
import Typography from '@/components/Typography'

import DeviceScreenAction from './Action'
import Form from './Form'
import useDashboardDevice from './hooks'
import { getAll } from './service'
import { DeviceResponse } from './types'

const columns: DataTableColumn = [
  {
    accessorKey: 'token',
    header: 'Token',
    enableSorting: true,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: true,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    enableSorting: true,
  },
]

const DeviceScreen: React.FC = () => {
  const {
    createState,
    tableRef,
    search,
    searchDebounce,
    handleSearch,
    rowClassName,
    onDelete,
  } = useDashboardDevice()

  return (
    <div className='space-y-5'>
      <Typography variant='h2' as='h1'>
        List of Devices
      </Typography>
      <div className='flex flex-row items-center justify-between gap-2'>
        <Input
          name='search'
          value={search}
          onChange={handleSearch}
          placeholder='Search...'
          rightIcon={<Search className='h-5 w-5 text-secondary-400' />}
          className='max-w-sm'
        />
        <Dialog open={createState.isOpen} onOpenChange={createState.toggle}>
          <Dialog.Trigger asChild>
            <Button rightIcon={<Plus className='ml-1 h-5 w-5' />}>
              Add Device
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title className='text-center'>Create Device</Dialog.Title>
            </Dialog.Header>
            <Form state={createState} tableRef={tableRef} />
          </Dialog.Content>
        </Dialog>
      </div>
      <DataTable
        tableRef={tableRef}
        columns={columns}
        apiController={getAll}
        hasAutoNumber
        query={{
          search: searchDebounce || undefined,
        }}
        rowClassName={rowClassName}
        actions={(idx, res: DeviceResponse) => (
          <DeviceScreenAction
            idx={idx}
            data={res}
            onDelete={onDelete}
            tableRef={tableRef}
          />
        )}
      />
    </div>
  )
}

export default DeviceScreen
