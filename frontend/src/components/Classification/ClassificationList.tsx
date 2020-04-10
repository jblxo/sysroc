import React, {useState} from "react";
import { useClassificationsQuery } from "../../generated/graphql";
import { Item } from '../Layout/Item';
import { List } from '../Layout/List';
import moment from "moment";
import {ClassificationFilter, ClassificationFilters} from "./ClassificationFilter";
import {getClassificationFilters, setClassificationFilters} from "../../filters/classification";

interface Props {
    userId?: string;
}

export const ClassificationList: React.FC<Props> = ({userId}) => {
    const [filters, setFilters] = useState<ClassificationFilters>(getClassificationFilters());
    const {data, loading} = useClassificationsQuery({variables: filters});

    if(loading) return <div>Loading...</div>;

    return (
        <div>
            <ClassificationFilter defaultValues={filters} onSubmit={(filter) => {
                setClassificationFilters(filter);
                setFilters(filter);
            }}/>
            <h2>Classification List</h2>
            <List>
                <div className="flex">
                    <Item>
                        <div>Mark</div>
                    </Item>
                    <Item>
                        <div>Note</div>
                    </Item>
                    <Item>
                        <div>Project</div>
                    </Item>
                    <Item>
                        <div>User</div>
                    </Item>
                    <Item>
                        <div>Created</div>
                    </Item>
                    <Item>
                        <div>Action</div>
                    </Item>
                </div>
                {data && data.classifications && data.classifications.map(classification => (
                    <div key={classification.id} className="flex">
                        <Item>
                            <div>{classification.mark}</div>
                        </Item>
                        <Item>
                            <div>{classification.note}</div>
                        </Item>
                        <Item>
                            <div>{classification.project.name}</div>
                        </Item>
                        <Item>
                            <div>{classification.user.name}</div>
                        </Item>
                        <Item>
                            <div>{moment(classification.createdAt).format('DD. MM. YYYY, dddd')}</div>
                        </Item>
                        <Item>
                            <div>Actions</div>
                        </Item>
                    </div>
                ))}
            </List>
        </div>
    );
};
