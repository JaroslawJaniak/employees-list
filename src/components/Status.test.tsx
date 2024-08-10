import { render, screen } from '@testing-library/react';
import { describe, expect, it  } from 'vitest';
import { Status } from './Status';

describe('Status', () => {
    it('renders badge with gray background for undefined status', async () => {
        render(<Status data='TEST' />);

        await screen.findByTestId('status');
        const span = screen.getByTestId('status');

        expect(span.classList.contains('text-bg-secondary')).toEqual(true);
    })

    it('renders badge with green background for HIRED status', async () => {
        render(<Status data='HIRED' />);

        await screen.findByTestId('status');
        const span = screen.getByTestId('status');

        expect(span.classList.contains('text-bg-success')).toEqual(true);
    })

    it('renders badge with yellow background for ON_LEAVE status', async () => {
        render(<Status data='ON_LEAVE' />);

        await screen.findByTestId('status');
        const span = screen.getByTestId('status');

        expect(span.classList.contains('text-bg-warning')).toEqual(true);
    })

    it('renders badge with red background for FIRED status', async () => {
        render(<Status data='FIRED' />);

        await screen.findByTestId('status');
        const span = screen.getByTestId('status');

        expect(span.classList.contains('text-bg-danger')).toEqual(true);
    })
});