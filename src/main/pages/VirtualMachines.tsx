import React, {useEffect, useState} from "react";
import '../../App.css'
import virtualMachineList from "../virtualmachine/VirtualMachineList";
import {VirtualMachineComplete} from "../interfaces/virtualMachine";
import {VirtualMachineRow} from "../../components/VirtualMachineRow";

const VirtualMachines = () => {

    const [vmList, setVmList] = useState<VirtualMachineComplete[]>([])
    let [runningVms, setRunningVms] = useState<number>(0)

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
                            <VirtualMachineRow virtualMachine = {virtualMachine} />
                        )
                    }
                )}
            </table>

        </div>

    )
}

export default VirtualMachines