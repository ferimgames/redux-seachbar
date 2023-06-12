export const boldedText = (text, shouldBeBold) => {
  text = text.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  shouldBeBold = shouldBeBold.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  const textArray = text.split(RegExp(shouldBeBold, "ig"));
  const match = text.match(RegExp(shouldBeBold, "ig"));

  return (
    <>
      {textArray.map((item, index) => (
        <span key={index}>
          {item}
          {index !== textArray.length - 1 && match && <b>{match[index]}</b>}
        </span>
      ))}
    </>
  );
};
