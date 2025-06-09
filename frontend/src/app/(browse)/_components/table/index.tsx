import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
    data: any[]
}

function TableMinimal({data}: Props) {
  return (
    <div className="bg-gray-900/80 rounded-lg p-4">
        <Table className="text-base">
            <TableCaption className="text-blue-300 text-left pb-4">* Data retrieved from the connected database</TableCaption>
            <TableHeader>
            <TableRow>
                {data.length > 0 &&
                    Object.keys(data[0]).map((key, idx) => (
                        <TableHead className="text-blue-400" key={idx}>{key}</TableHead>
                    ))
                }
            </TableRow>
            </TableHeader>
            <TableBody>
            {data.map((item) => (
                <TableRow key={item.id}>
                {Object.values(item).map((value, idx) => (
                    <TableCell className="text-gray-50" key={idx}>{String(value)}</TableCell>
                ))}
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default TableMinimal