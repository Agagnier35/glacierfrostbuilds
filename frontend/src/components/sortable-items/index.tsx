import React, { CSSProperties, useState } from 'react';
import {
    DragDropContext,
    Draggable,
    DraggableLocation,
    DraggingStyle,
    Droppable,
    DropResult,
    NotDraggingStyle,
} from 'react-beautiful-dnd';

interface Items {
    id: string;
    content: string;
}

const getItems = (count: number, offset = 0): Items[] =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`,
    }));

// a little function to help us with reordering the result
const reorder = (list: Items[], startIndex: number, endIndex: number): Items[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
    source: Items[],
    destination: Items[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation,
): { [droppableId: string]: Items[] } => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: { [droppableId: string]: Items[] } = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle?: DraggingStyle | NotDraggingStyle): CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `1px ${grid / 2}px `,
    flex: '0 0 100px',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): CSSProperties => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    margin: '1px',
    display: 'flex',
    overflowX: 'auto',
});

const SortableContainer = () => {
    const [items, setItems] = useState<Items[]>(getItems(10));
    const [selected, setSelected] = useState<Items[]>(getItems(5, 10));

    const id2List: { [droppableId: string]: Items[] } = {
        items: items,
        selected: selected,
    };

    const getList = (id: string) => id2List[id];

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(getList(source.droppableId), source.index, destination.index);

            if (source.droppableId === 'selected') {
                setSelected(items);
            }
        } else {
            const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination);
            setItems(result.items);
            setSelected(result.selected);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="items" direction="horizontal">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="selected" direction="horizontal">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                        {selected.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default SortableContainer;
