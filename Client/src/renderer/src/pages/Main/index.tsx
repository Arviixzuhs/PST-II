import { AppTable } from '@renderer/components/TableUser'
import { Consults } from '../Consults'
import { CreateNewUserModal } from '@renderer/components/Modals/newUser'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'

export const TabsNav = () => {
  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Options' color='primary'>
        <Tab key='patient' title='Pacientes'>
          <AppTable managePatientButtonModal={<CreateNewUserModal />} />
        </Tab>
        <Tab key='staff' title='Personal'>
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab key='rooms' title='Habitaciones'>
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab key='consultation' title='Consultas'>
          <Consults />
        </Tab>
      </Tabs>
    </div>
  )
}
