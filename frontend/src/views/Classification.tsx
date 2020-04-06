import React from 'react';
import {ClassificationHeader} from "../components/Classification/ClassificationHeader";
import {useMeQuery} from "../generated/graphql";

interface Props {}

export const Classification: React.FC<Props> = props => {
    const [open, setOpen] = React.useState(false);
    const { data, loading } = useMeQuery();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <ClassificationHeader handleOpen={handleOpen} />
        </>
    )
};
