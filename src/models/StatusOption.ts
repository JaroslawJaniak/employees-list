import { EmployeeStatus } from "./Employee";

export interface StatusOption { 
    label: string, 
    value: EmployeeStatus 
}

export const STATUS_OPTIONS: StatusOption[] = [
    {
        label: 'Zatrudniony',
        value: 'HIRED'
    },
    {
        label: 'Na Urlopie',
        value: 'ON_LEAVE'
    },
    {
        label: 'Zwolniony',
        value: 'FIRED'
    }
]