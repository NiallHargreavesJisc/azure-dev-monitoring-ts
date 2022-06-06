import React, {useState} from "react";
import {VirtualMachineComplete} from "../main/interfaces/virtualMachine";
import {changePowerState} from "../main/utils/ApiHelper";
import DeletionAlert from "./DeletionAlert";

interface VirtualMachineRowProps {
    virtualMachine: VirtualMachineComplete
}

export const VirtualMachineRow = ({virtualMachine}: VirtualMachineRowProps) => {

    const [deletionAlert, setDeletionAlert] = useState(false)

    const deleteConfimationBox = () => {
        setDeletionAlert(true)
    }

    return (
        <>
            <tr>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{virtualMachine.name}</td>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{virtualMachine?.tags["Jenkins User"]}</td>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{virtualMachine.powerState}</td>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{virtualMachine.tags["created Date"]}</td>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{virtualMachine.tags.Project}</td>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{virtualMachine.tags.Branch}</td>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{virtualMachine.ipAddress}</td>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{virtualMachine.tags.Commit}</td>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{virtualMachine.tags.Type}</td>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{virtualMachine.tags.Status}</td>
                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                    {virtualMachine.powerState === '**RUNNING!**' &&
                    <button onClick={() => {
                        changePowerState(virtualMachine, 'deallocate')
                    }}>Power Off</button>}
                    {virtualMachine.powerState === 'Stopped' &&
                    <button onClick={() => {
                        changePowerState(virtualMachine, 'start')
                    }}>Start</button>}
                    {virtualMachine.powerState === 'Deallocated' &&
                    <button onClick={() => {
                        changePowerState(virtualMachine, 'start')
                    }}>Start</button>}

                </td>
                <button onClick={() => {deleteConfimationBox()}}>Delete</button>
            </tr>

            {deletionAlert && <DeletionAlert virtualMachine={virtualMachine}/>}
        </>

    
    )
}