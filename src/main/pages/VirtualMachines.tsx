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
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Vm Name</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Vm Owner</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Power State</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Created Date</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Project</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Branch</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">IP Address</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Commit ID</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Type</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Vm Status</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Change Power State</th>
                    <th scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Delete</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {vmList.length > 0 && vmList.map(virtualMachine => {
                        return (
                            <VirtualMachineRow virtualMachine = {virtualMachine} />
                        )
                    }
                )}
                </tbody>
            </table>

        </div>

    )
}

export default VirtualMachines