import { useState } from 'react';
import { STATUS_OPTIONS } from '../models/StatusOption';
import { useTranslation } from 'react-i18next';

export interface StatusSelectProps {
    name: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function StatusSelect({name, defaultValue, onChange}: StatusSelectProps) {
    const { t } = useTranslation();
    const [statusOptions] = useState(STATUS_OPTIONS);

    return (
        <select onChange={onChange} defaultValue={defaultValue} className="form-control" name={name}>
            {statusOptions.map((statusCode) => (<option key={statusCode} value={statusCode}>{t('status_' + statusCode)}</option>))}
        </select>
    )
}