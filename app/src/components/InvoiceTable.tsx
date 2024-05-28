import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ServiceResponse } from "../models/invoice.model";

export function InvoiceTable({
    invoice
}: {
    invoice: ServiceResponse[]
}) {
    const total = invoice?.reduce((acc, curr) => acc += curr.price, 0) || 0;

    const ServiceCell = (service: ServiceResponse, sn: number) => (
        <TableRow
            key={sn}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>
                {sn}
            </TableCell>
            <TableCell>
                {service.description}
            </TableCell>
            <TableCell>
                ${service.price}
            </TableCell>
        </TableRow>
    );

    return (
        <TableContainer
            sx={{
                boxShadow: "none"
            }}>
            <Table
                sx={{
                    minWidth: 300
                }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            S/N
                        </TableCell>
                        <TableCell>
                            Description
                        </TableCell>
                        <TableCell>
                            Price
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        invoice
                            ?.map((service, i) => ServiceCell(service, i + 1))
                    }
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            Total
                        </TableCell>
                        <TableCell>
                            ${total}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}