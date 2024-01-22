import React, { useState } from "react";

const BlockCreationCard = ({
    onAddBlock,
    blocks,
    index,
    onUpdateBlockType,
    setBody,
    body,
}) => {
    const [blockType, setBlockType] = useState("heading");

    const handleBlockTypeChange = (e) => {
        const newBlockType = e.target.value;
        setBlockType(newBlockType);
    };

    const handleAddBlock = () => {
        onAddBlock(blockType);
    };
    const handleBodyChange = (e) => {
        setBody(e.target.value);
        console.log(body);
    };

    console.log("blockType", blockType);
    return (
        <div>
            <div>
                <label htmlFor="blockType">Block Type:</label>
                <select
                    id="blockType"
                    value={blockType}
                    onChange={handleBlockTypeChange}
                >
                    <option value="heading">Heading</option>
                    <option value="paragraph">Paragraph</option>
                </select>
                <button onClick={handleAddBlock}>+</button>

                {blockType === "heading" && (
                    <div>
                        <input
                            type="text"
                            className="bg-blue-200 text-xl font-bold"
                            onChange={handleBodyChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlockCreationCard;
