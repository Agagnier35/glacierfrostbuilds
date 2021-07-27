import React, { ChangeEvent } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { VoteType } from '../../api/model/build';

interface NumberPickerProps {
    value: number;
    status?: VoteType;
    canEditValue?: boolean;
    onChange?: (n: number) => void;
    increment?: () => void;
    decrement?: () => void;
    renderButtons?: boolean;
}

const NumberPicker = ({
    value,
    onChange = () => {},
    status,
    canEditValue = true,
    renderButtons = true,
    increment = () => onChange(value + 1),
    decrement = () => onChange(value - 1),
}: NumberPickerProps) => {
    const handleChangeNumberOnly = (e: ChangeEvent<HTMLInputElement>) => {
        const number =
            e.target.value === '' ? 0 : /^[-+]?(\d+|Infinity)$/.test(e.target.value) ? parseInt(e.target.value) : NaN;

        if (!isNaN(number) && number >= 0 && number < 1000) {
            onChange(number);
        }
    };

    const getButtonColorClassName = (up: boolean = false, prefix: string = 'outline') => {
        switch (status) {
            case 'UPVOTE':
                return up ? `success` : `${prefix}-dark`;
            case 'DOWNVOTE':
                return !up ? `danger` : `${prefix}-dark`;
            default:
                return `${prefix}-dark`;
        }
    };

    return (
        <ButtonGroup
            vertical
            size="sm"
            className="d-flex justify-content-center align-items-center"
            style={{ minWidth: '50px', maxHeight: '100px' }}
        >
            {renderButtons && (
                <Button
                    variant={getButtonColorClassName(true)}
                    onClick={(e) => {
                        e.stopPropagation();
                        increment();
                    }}
                >
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
                <h4 className={'text-' + getButtonColorClassName(status === 'UPVOTE')}>{value}</h4>
            )}
            {renderButtons && (
                <Button
                    variant={getButtonColorClassName()}
                    onClick={(e) => {
                        e.stopPropagation();
                        decrement();
                    }}
                >
                    &#9660;
                </Button>
            )}
        </ButtonGroup>
    );
};

export default NumberPicker;
