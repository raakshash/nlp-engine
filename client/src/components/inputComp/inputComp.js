import React from 'react';

const InputComp = function (iProps) {
    return (<input
        value={iProps.data}
        name="intent" id={iProps.id} className="form-control" type="text" readonly />);
}

export default InputComp;
