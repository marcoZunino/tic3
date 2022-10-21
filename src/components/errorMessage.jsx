import React from "react";
import {Alert, AlertTitle, Button} from "@mui/material";

export const ErrorMessage = (msg, setMsg) => {
    if (msg === '') return null;
    return (
        <div>
            <Alert className="errorMsg" severity="error"
                   action = {
                       <Button color="inherit" size="small" onClick={() => setMsg('')}> X </Button>
                   }
            >
                {/*<AlertTitle className="errorTitle"></AlertTitle>*/}
                {msg}
            </Alert>
        </div>
    );



    // return (
    //     <div>
    //         {/*{Object.keys(props.message).map(field =>*/}
    //         {/*    <dl key={field}>*/}
    //         {/*        <dt>{field}</dt>*/}
    //         {/*        {props.message[field].map(error =>*/}
    //         {/*            <dd key={error}>{error}</dd>*/}
    //         {/*        )}*/}
    //         {/*    </dl>*/}
    //         {/*)}*/}
    //     </div>
    //     // <div className="base-container" ref={props.containerRef}>
    //     //     <div className="header"> {props.message} </div>
    //     // </div>
    // );


}