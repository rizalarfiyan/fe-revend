'use client'

import { Plus, Search } from 'lucide-react'
import { OnChangeValue } from 'react-select'

import { cn } from '@/utils/classes'

import { SelectValue } from '@/@types'
import Button from '@/components/Button'
import DataTable, { DataTableColumn } from '@/components/DataTable'
import Dialog from '@/components/Dialog'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { DATATABLE_STATUS_OPTION } from '@/constants/options'

import DeviceScreenAction from './Action'
import Form from './Form'
import useDashboardDevice from './hooks'
import { getAll } from './service'
import { DeviceResponse } from './types'
import DashboardTitle from '../Partials/DashboardTitle'

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
    onDelete,
    filter,
    setFilter,
  } = useDashboardDevice()

  return (
    <div className='space-y-10'>
      <DashboardTitle
        title='Device'
        description='Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.'
      />
      <div className='space-y-5'>
        <div className='flex flex-col items-center justify-between gap-2 xl:flex-row'>
          <div className='flex w-full flex-wrap justify-center gap-2 xl:flex-nowrap xl:justify-start'>
            <Input
              name='search'
              value={search}
              onChange={handleSearch}
              placeholder='Search...'
              rightIcon={<Search className='h-5 w-5 text-secondary-400' />}
            />
            <Select
              className='w-[160px]'
              value={filter.status}
              isClearable
              options={DATATABLE_STATUS_OPTION}
              placeholder='Status'
              onChange={(val: OnChangeValue<unknown, false>) => {
                setFilter((prev) => ({
                  ...prev,
                  status: val as SelectValue,
                }))
              }}
            />
          </div>
          <div className='flex-shrink' />
          <Dialog open={createState.isOpen} onOpenChange={createState.toggle}>
            <Dialog.Trigger asChild>
              <Button
                rightIcon={<Plus className='ml-1 h-5 w-5' />}
                className='whitespace-nowrap'
              >
                Create Device
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title className='text-center'>
                  Create Device
                </Dialog.Title>
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
            status: filter?.status?.value || undefined,
          }}
          rowClassName={(row: DeviceResponse) => {
            return cn(
              row.is_deleted && !filter?.status?.value && 'text-red-500',
            )
          }}
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
    </div>
  )
}

export default DeviceScreen
