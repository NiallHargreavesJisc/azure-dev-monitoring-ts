import React, {useState} from "react";
import {VirtualMachineComplete} from "../main/interfaces/virtualMachine";
import {changePowerState, deleteVirtualMachine} from "../main/utils/ApiHelper";
import DeletionAlert from "./DeletionAlert";

interface VirtualMachineRowProps {
    virtualMachine: VirtualMachineComplete
}






export const VirtualMachineRow = ({virtualMachine}: VirtualMachineRowProps) => {

    const [showDeletionConfirmationBox, setshowDeletionConfirmationBox] = useState(false)

    const deleteConfimation = (virtualMachine: VirtualMachineComplete) => {

        console.log(virtualMachine.name)

        setshowDeletionConfirmationBox(true)

        console.log(showDeletionConfirmationBox)

        return(
            <div>
                {showDeletionConfirmationBox === true && <DeletionAlert showDeletionConfirmationBox={showDeletionConfirmationBox} virtualMachine = {virtualMachine}/>}
            </div>
        )
    }


    //const date = dateFormatter(virtualMachine.tags["created Date"])
    return (
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
            <button onClick={() => {
                deleteConfimation(virtualMachine)
            }}>Delete</button>
        </tr>
    
    )
}