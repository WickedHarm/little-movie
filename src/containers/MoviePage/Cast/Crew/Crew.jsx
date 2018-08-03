import React from "react";

import classes from "./Crew.css";

class Crew extends React.Component {

    createCrewObject(data) {
        const {crew} = data;
        
        const crewObj = {
            producer: [],
            writer: [],
            director: []
        };
        const crewObjItem = (item) => ({
            name: item.name,
            img: item.profile_path,
            id: item.id
        });
        let producersCount = 0;
        crew.slice(0, 20).forEach(item => {
            switch(item.job) {
                case "Producer":
                    if(producersCount < 3) {
                        crewObj.producer.push(crewObjItem(item));
                        producersCount++;
                    }
                    break;

                case "Screenplay":
                case "Writer":
                case "Story":
                    crewObj.writer.push(crewObjItem(item));
                    break;

                case "Director":
                    crewObj.director.push(crewObjItem(item))
                    break;
                default: return;            
            }
            
        });

        return crewObj;
    }


    createCrewList(role, uniq) {
        const uniqueList = uniq ? [...new Map(role.map( writer => [writer.id, writer] )).values()] : role ;
        const list = uniqueList.map( item => {
            const {name, id} = item;
            return <li key={id}>{name}</li>
        } )

        return list;
    }

    render() {
        const data = this.createCrewObject(this.props.credits);
        return (
            <div className={classes.Crew}>
                <div>
                    <h3>Director</h3>
                    <ul>
                        {this.createCrewList(data.director)}
                    </ul>
                </div>
                <div>
                    <h3>Producer</h3>
                    <ul>
                    {this.createCrewList(data.producer)}
                    </ul>
                </div>
                <div>
                    <h3>Writer</h3>
                    <ul>
                        {this.createCrewList(data.writer, true)}
                    </ul>
                </div>
                
            </div>
        )
    }
}

export default Crew;