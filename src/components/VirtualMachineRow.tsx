import React from "react";
import {VirtualMachineComplete} from "../main/interfaces/virtualMachine";
import {changePowerState, deleteVirtualMachine} from "../main/utils/ApiHelper";

interface VirtualMachineRowProps {
    virtualMachine: VirtualMachineComplete
}

export const VirtualMachineRow = ({virtualMachine}: VirtualMachineRowProps) => {
    console.log('VM: ', virtualMachine)
    return (
        <tr>
            <td>{virtualMachine.name}</td>
            <td>{virtualMachine?.tags["Jenkins User"]}</td>
            <td>{virtualMachine.powerState}</td>
            <td>{virtualMachine.tags["created Date"]}</td>
            <td>{virtualMachine.tags.Project}</td>
            <td>{virtualMachine.tags.Branch}</td>
            <td>{virtualMachine.ipAddress}</td>
            <td>{virtualMachine.tags.Commit}</td>
            <td>{virtualMachine.tags.Type}</td>
            <td>{virtualMachine.tags.Status}</td>
            <td>
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
                deleteVirtualMachine(virtualMachine)
            }}>Delete</button>
        </tr>
    )
}