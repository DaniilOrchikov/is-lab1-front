import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import {Worker} from "../../types";
import {
    fetchWorkersThunk,
    deleteWorkerByIdThunk,
} from '../slices/workersSlice';
import React, {useState} from 'react';


const OldWorkersTable = () => {
    const workers = useSelector((state: RootState) => state.workers);
    const dispatch = useAppDispatch();

    const frameSize = 20;
    const [offset, setOffset] = useState(0);
    const [sortField, setSortField] = useState<keyof Worker | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const nextPage = () => {
        if (offset + frameSize < workers.length) {
            setOffset(offset + frameSize);
        }
    };

    const previousPage = () => {
        if (offset - frameSize >= 0) {
            setOffset(offset - frameSize);
        }
    };
    //
    const handleDeleteWorker = (id: number) => {
        dispatch(deleteWorkerByIdThunk(id));
        dispatch(fetchWorkersThunk());
        if (workers.length <= offset + 1) {
            setOffset((workers.length - frameSize) - workers.length % frameSize);
        }
    };
    //
    const handleUpdateWorker = (id:number) => {
        alert()
    }

    const handleSort = (field: keyof Worker) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };
    //
    const sortedWorkers = [...workers].sort((a, b) => {
        if (sortField) {
            if (sortDirection === 'asc') {
                return a[sortField]! > b[sortField]! ? 1 : -1;
            } else {
                return a[sortField]! < b[sortField]! ? 1 : -1;
            }
        }
        return 0;
    });


    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>id{sortField === "id" ? sortDirection === "asc" ? "▲" : "▼" : ""}</th>
                    <th onClick={() => handleSort('name')}>name{sortField === "name" ? sortDirection === "asc" ? "▲" : "▼" : ""}</th>
                    <th onClick={() => handleSort('salary')}>salary{sortField === "salary" ? sortDirection === "asc" ? "▲" : "▼" : ""}</th>
                    <th onClick={() => handleSort('rating')}>rating{sortField === "rating" ? sortDirection === "asc" ? "▲" : "▼" : ""}</th>
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                {sortedWorkers.slice(offset, offset + frameSize).filter(worker => worker.id !== null).map(worker => (
                    <tr key={worker.id} onDoubleClick={()=>handleUpdateWorker(worker.id!)}>
                        <td>{worker.id}</td>
                        <td>{worker.name}</td>
                        <td>{worker.salary}</td>
                        <td>{worker.rating}</td>
                        <td>
                            <button onClick={(event) => {
                                event.preventDefault();
                                handleDeleteWorker(worker.id!);
                            }}>
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>Страница {offset / frameSize + 1}</div>
            <button onClick={previousPage} disabled={offset < frameSize}>Previous</button>
            <button onClick={nextPage} disabled={workers.length <= offset + frameSize}>Next</button>
        </div>
    );
};

export default OldWorkersTable;