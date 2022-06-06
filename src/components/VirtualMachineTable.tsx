import {VirtualMachineRow} from "./VirtualMachineRow";
import React from "react";
import {VirtualMachineComplete} from "../main/interfaces/virtualMachine";
import {virtualMachineTableParams} from "../main/interfaces/virtualMachineTableParams";

const VirtualMachineTable = ({vmList}: virtualMachineTableParams) => {

    return (
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
                        <VirtualMachineRow virtualMachine = {virtualMachine} key={virtualMachine.id} />
                    )
                }
            )}
            </tbody>
        </table>
    )
}

export default VirtualMachineTable