import React, {useEffect, useState} from "react";
import '../../App.css'
import virtualMachineList from "../virtualmachine/VirtualMachineList";
import {VirtualMachineComplete} from "../interfaces/virtualMachine";

const VirtualMachines = () => {

    const [vmList, setVmList] = useState<VirtualMachineComplete[]>([])
    let [runningVms, setRunningVms] = useState<number>(0)

    // @ts-ignore
    useEffect( () => {
        const fetchData = async () => {
            const vms = await virtualMachineList()
            setVmList(vms)

            const running = vms.filter(virtualMachine =>virtualMachine.powerState === '**RUNNING!**' )
            setRunningVms(running.length)

        }
        fetchData();



        // @ts-ignore

    },[] )

    return (
        <div>
            <h1>Virtual Machines</h1>
            <h2>There are {vmList.length}  virtual machines with {runningVms} running.</h2>
            <table>
                <tr>
                    <th>Vm Name</th>
                    <th>Vm Owner</th>
                    <th>Power State</th>
                    <th>Created Date</th>
                    <th>Project</th>
                    <th>Branch</th>
                    <th>IP Address</th>
                    <th>Commit ID</th>
                    <th>Type</th>
                    <th>Vm Status</th>
                    <th>Change Power State</th>
                    <th>Delete</th>
                </tr>
                {vmList.length > 0 && vmList.map(virtualMachine => {
                        return (
                            <tr>
                                <td>{virtualMachine.name}</td>
                                <td>{virtualMachine.tags["Jenkins User"]}</td>
                                <td>{virtualMachine.powerState}</td>
                                <td>{virtualMachine.tags["created Date"]}</td>
                                <td>{virtualMachine.tags.Project}</td>
                                <td>{virtualMachine.tags.Branch}</td>
                                <td>{virtualMachine.ipAddress}</td>
                                <td>{virtualMachine.tags.Commit}</td>
                                <td>{virtualMachine.tags.Type}</td>
                                <td>{virtualMachine.tags.Status}</td>
                                {/*{virtualMachine.powerState === '**RUNNING!**' &&*/}
                                {/*<td><a style="font-weight: bold" th:href="@{/power_off_virtual_machine(vm=${vm?.getName()})}">Deallocate</a></td>}*/}
                                {/*{virtualMachine.powerState === 'Deallocated' &&*/}
                                {/*<td><a th:href="@{/start_virtual_machine(vm=${vm?.getName()})}">Start</a></td>}*/}
                                {/*{virtualMachine.powerState === 'Stopped' &&*/}
                                {/*<td><a th:href="@{/start_virtual_machine(vm=${vm?.getName()})}">Start</a></td>}*/}
                                {/*<td><button onClick={() = console.log('button')}/></td>*/}

                                {/*<td><a href = "http://jenkins1.prospects.ac.uk:8080/view/Manage%20VM/job/Destroy%20Existing%20VM%20(Azure)/build?delay=0sec">Delete</a></td>*/}
                            </tr>
                        )
                    }
                )}
            </table>

        </div>

    )
}

export default VirtualMachines