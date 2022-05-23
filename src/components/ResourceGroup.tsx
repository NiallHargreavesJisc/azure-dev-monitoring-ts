import React, {ReactElement} from "react";
import {IResourceGroup} from "../main/interfaces/resourceGroup";
import AppServicePlans from "./AppServicePlans";

interface IResourceGroupProps {
    resourceGroup: IResourceGroup
    environment: string
}

const ResourceGroup = ({resourceGroup, environment}: IResourceGroupProps): ReactElement => {
    return (
        <div>
            <p>{resourceGroup.name}</p>
            <AppServicePlans rgName = {resourceGroup.name} environment = {environment} />
        </div>

        )
}

export default ResourceGroup