import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import React, { useRef } from "react";
import { Address } from "../../../types";
import UniversalTable, { HeadCell, standardFilterField } from "./UniversalTable";
import AddressForm from "../forms/AddressForm";
import UpdateAddress from "../updates/UpdateAddress";
import CreateAddressButton from "../buttons/CreateAddressButton";

const AddressesTable = () => {
    const addresses = useSelector((state: RootState) => state.addresses);

    const refUpdateForm = useRef<{ handleClickOpen: (id: number) => void } | null>(null);

    const headCells: HeadCell<Address>[] = [
        {
            id: 'id',
            numeric: true,
            label: 'Id',
            filterComponent: ({ value, onChange }) => {
                return standardFilterField({ value, onChange });
            }
        },
        {
            id: 'street',
            numeric: false,
            label: 'Street',
            filterComponent: ({ value, onChange }) => {
                return standardFilterField({ value, onChange });
            }
        },
        {
            id: 'zipCode',
            numeric: false,
            label: 'Zip Code',
            filterComponent: ({ value, onChange }) => {
                return standardFilterField({ value, onChange });
            }
        }
    ];

    const compareAddresses = (a: Address, b: Address, orderBy: keyof Address) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const formatCellData = (columnId: keyof Address, data: Address[keyof Address]) => {
        return data;
    };

    return (
        <>
            <UniversalTable
                data={addresses}
                headCells={headCells}
                comparator={compareAddresses}
                formatCellData={formatCellData}
                updateRef={refUpdateForm}
            />
            <UpdateAddress ref={refUpdateForm} />
            <CreateAddressButton />
        </>
    );
};

export default AddressesTable;