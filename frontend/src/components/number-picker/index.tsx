import React, { ChangeEvent } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

interface NumberPickerProps {
    value: number;
    status?: 'upvoted' | 'downvoted' | 'normal';
    canEditValue?: boolean;
    onChange: (n: number) => void;
}

const NumberPicker = ({ value, onChange, status = 'normal', canEditValue = true }: NumberPickerProps) => {
    const handleChangeNumberOnly = (e: ChangeEvent<HTMLInputElement>) => {
        const number = /^[-+]?(\d+|Infinity)$/.test(e.target.value) ? parseInt(e.target.value) : NaN;

        if (!isNaN(number) && number >= 0) {
            onChange(number);
        }
    };

    const getButtonColorClassName = (up: boolean) => {
        switch (status) {
            case 'normal':
                return 'btn-outline-info';
            case 'upvoted':
                return up ? 'btn-outline-success' : 'btn btn-outline-dark';
            case 'downvoted':
                return !up ? 'btn-outline-danger' : 'btn btn-outline-dark';
        }
    };

    return (
        <ButtonGroup vertical size="sm">
            {canEditValue && (
                <Button className={getButtonColorClassName(true)} onClick={() => onChange(value + 1)}>
                    &#9650;
                </Button>
            )}
            {canEditValue ? (
                <Form.Control
                    size="sm"
                    type="text"
                    className="rounded-0 "
                    value={value}
                    style={{ textAlign: 'center' }}
                    onChange={handleChangeNumberOnly}
                />
            ) : (
                <h4 className="text-info">{value}</h4>
            )}
            {canEditValue && (
                <Button className={getButtonColorClassName(false)} onClick={() => onChange(value - 1)}>
                    &#9660;
                </Button>
            )}
        </ButtonGroup>
    );
};

export default NumberPicker;
