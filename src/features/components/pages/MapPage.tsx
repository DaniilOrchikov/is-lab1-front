import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {Worker} from '../../../types';
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import Header from "../Header";
import UpdateWorker from "../updates/UpdateWorker";
import CoordinatesForm from "../forms/CoordinatesForm";
import OrganizationForm from "../forms/OrganizationForm";
import PersonForm from "../forms/PersonForm";
import AddressForm from "../forms/AddressForm";
import LocationForm from "../forms/LocationForm";
import WorkerForm from "../forms/WorkerForm";

const WORKER_WIDTH = 100;
const WORKER_HEIGHT_DEFAULT = 20;

const PADDING_X = 20;
const PADDING_Y = 30;

const getColorForCreator = (() => {
    const colorMap: { [key: string]: string } = {};
    const colors = [
        '#FF5733',
        '#33FF57',
        '#3357FF',
        '#F333FF',
        '#FF8C33',
        '#8C33FF',
        '#33FF8C',
    ];

    const generateBrightColor = (): string => {
        const randomComponent = () => Math.floor(Math.random() * 128 + 70);
        const r = randomComponent();
        const g = randomComponent();
        const b = randomComponent();
        return `rgb(${r}, ${g}, ${b})`;
    };

    let index = 0;
    return (creatorName: string): string => {
        if (!colorMap[creatorName]) {
            if (index < colors.length) {
                colorMap[creatorName] = colors[index];
            } else {
                colorMap[creatorName] = generateBrightColor();
            }
            index += 1;
        }
        return colorMap[creatorName];
    };
})();

const MapPage: React.FC = () => {
    const workers = useSelector((state: RootState) => state.workers);
    const coordinatesList = useSelector((state: RootState) => state.coordinatesList);
    const persons = useSelector((state: RootState) => state.persons);

    const refUpdateForm = useRef<{ handleClickOpen: (id: number) => void } | null>(null);

    const findCoordinates = (worker: Worker) => {
        const coords = coordinatesList.find((coordinates) => worker.coordinatesId === coordinates.id);
        if (!coords) {
            return {x: 0, y: 0};
        }
        return coords;
    };

    const findPerson = (worker: Worker) => {
        const person = persons.find((person) => worker.personId === person.id);
        if (person === undefined) return {height: WORKER_HEIGHT_DEFAULT};
        return person;
    };

    function handleClickOpen(workerId: number) {
        if (refUpdateForm.current) {
            refUpdateForm.current.handleClickOpen(workerId);
        }
    }

    const {minX, minY, maxX, maxY} = useMemo(() => {
        if (workers.length === 0) {
            return {minX: 0, minY: 0, maxX: 100, maxY: 100};
        }
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        workers.forEach(worker => {
            const coords = findCoordinates(worker);
            minX = Math.min(minX, coords.x);
            minY = Math.min(minY, coords.y);
            maxX = Math.max(maxX, coords.x);
            maxY = Math.max(maxY, coords.y);
        });
        return {minX, minY, maxX, maxY};
    }, [workers, coordinatesList]);

    const maxHeight = useMemo(() => {
        if (workers.length === 0) {
            return WORKER_HEIGHT_DEFAULT;
        }
        let maxHeight = -Infinity;
        workers.forEach(worker => {
            const person = findPerson(worker);
            maxHeight = Math.max(maxHeight, person.height);
        });
        return maxHeight;
    }, [workers, persons]);

    const containerRef = useRef<HTMLDivElement>(null);

    const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
        width: 800,
        height: 600,
    });

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === containerRef.current) {
                    const {width, height} = entry.contentRect;
                    setContainerSize({width, height});
                }
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const {scaleX, scaleY} = useMemo(() => {
        const availableWidth = containerSize.width - PADDING_X * 2 - WORKER_WIDTH;
        const availableHeight = containerSize.height - PADDING_Y * 2 - maxHeight;
        const contentWidth = maxX - minX;
        const contentHeight = maxY - minY;

        const effectiveContentWidth = contentWidth === 0 ? 1 : contentWidth;
        const effectiveContentHeight = contentHeight === 0 ? 1 : contentHeight;

        const scaleX = availableWidth / effectiveContentWidth;
        const scaleY = availableHeight / effectiveContentHeight;

        return {scaleX, scaleY};
    }, [minX, minY, maxX, maxY, containerSize]);

    const groupedWorkers = useMemo(() => {
        const groups: { [key: string]: Worker[] } = {};
        workers.forEach(worker => {
            const coords = findCoordinates(worker);
            const key = `${coords.x},${coords.y}`;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(worker);
        });
        return groups;
    }, [workers, coordinatesList]);

    const [activeGroup, setActiveGroup] = useState<Worker[] | null>(null);

    const handleGroupClick = (workersInGroup: Worker[]) => {
        setActiveGroup(workersInGroup);
    };

    const handleCloseGroup = () => {
        setActiveGroup(null);
    };

    const generateConicGradient = (colors: string[]): string => {
        const colorCountMap: { [color: string]: number } = {};

        colors.forEach(color => {
            colorCountMap[color] = (colorCountMap[color] || 0) + 1;
        });

        const total = colors.length;
        let cumulativePercent = 0;
        const gradientParts: string[] = [];

        for (const [color, count] of Object.entries(colorCountMap)) {
            const percent = (count / total) * 100;
            const start = cumulativePercent;
            const end = cumulativePercent + percent;
            gradientParts.push(`${color} ${start}%`);
            gradientParts.push(`${color} ${end}%`);
            cumulativePercent += percent;
        }

        return `conic-gradient(${gradientParts.join(', ')})`;
    };

    return (
        <>
            <Header/>
            <Box
                ref={containerRef}
                sx={{
                    position: 'relative',
                    width: "100vw",
                    height: "92vh",
                    overflow: 'hidden',
                }}
            >
                {Object.entries(groupedWorkers).map(([key, workersInGroup]) => {
                    const [x, y] = key.split(',').map(Number);
                    const coords = {x, y};
                    const person = findPerson(workersInGroup[0]);
                    const scaledX = (coords.x - minX) * scaleX + WORKER_WIDTH / 2 + PADDING_X;
                    const scaledY = (coords.y - minY) * scaleY + maxHeight / 2 + PADDING_Y;

                    if (workersInGroup.length === 1) {
                        const worker = workersInGroup[0];
                        return (
                            <Box
                                key={worker.id}
                                onDoubleClick={() => handleClickOpen(worker.id)}
                                sx={{
                                    position: 'absolute',
                                    left: scaledX,
                                    top: scaledY,
                                    width: WORKER_WIDTH,
                                    height: person.height,
                                    backgroundColor: getColorForCreator(worker.creatorName),
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: 3,
                                    '&:hover': {
                                        boxShadow: 6,
                                        zIndex: 10,
                                    },
                                    transform: `translate(-50%, -50%)`,
                                }}
                            >
                                <Typography variant="body2" align="center" color="#fff"
                                            sx={{background: 'rgb(44, 49, 54, 0.7)', padding: 1, borderRadius: 1}}>
                                    {worker.name}
                                </Typography>
                            </Box>
                        );
                    }

                    const groupColors = workersInGroup.map(worker => getColorForCreator(worker.creatorName));
                    const gradient = generateConicGradient(groupColors);

                    return (
                        <Box
                            key={key}
                            onDoubleClick={() => handleGroupClick(workersInGroup)}
                            sx={{
                                position: 'absolute',
                                left: scaledX,
                                top: scaledY,
                                width: WORKER_WIDTH,
                                height: WORKER_WIDTH,
                                backgroundImage: gradient,
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 3,
                                '&:hover': {
                                    boxShadow: 6,
                                    zIndex: 10,
                                },
                                transform: `translate(-50%, -50%)`,
                            }}
                        >
                            <Typography variant="body1" align="center" color="#fff"
                                        sx={{background: 'rgb(44, 49, 54, 0.7)', padding: 1, borderRadius: 1}}>
                                {workersInGroup.length}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>

            <Dialog
                open={Boolean(activeGroup)}
                onClose={handleCloseGroup}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Employees with this coordinates:</DialogTitle>
                <DialogContent dividers>
                    {activeGroup && activeGroup.map(worker => (
                        <Box
                            key={worker.id}
                            sx={{
                                backgroundColor: getColorForCreator(worker.creatorName),
                                padding: 1,
                                marginBottom: 1,
                                borderRadius: 1,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                            onDoubleClick={() => {
                                handleClickOpen(worker.id);
                            }}
                        >
                            <Typography variant="body2" color="#fff" sx={{
                                background: 'rgb(44, 49, 54, 0.7)',
                                padding: 1,
                                margin: -1,
                                borderRadius: 1
                            }}>
                                {worker.name}
                            </Typography>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseGroup} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>

            <UpdateWorker ref={refUpdateForm}/>
            <WorkerForm/>
            <CoordinatesForm/>
            <OrganizationForm/>
            <PersonForm/>
            <AddressForm/>
            <LocationForm/>
        </>
    );
};

export default MapPage;