import React from "react";

const HistoryPagination = ({ pagIndex, setPagIndex, maxPag, resize }) => {
  const blockPrev = pagIndex === 1;
  const blockNext = pagIndex === maxPag || maxPag === 0;

  const pagStyle =
    resize.windowWidth < 425
      ? undefined
      : {
          width: `${resize.getWidth(60)}px`,
          height: `${resize.getWidth(60)}px`,
          fontSize: `${resize.getWidth(28)}px`,
          lineHeight: `${resize.getWidth(60)}px`,
          borderRadius: `${resize.getWidth(10)}px`,
          backgroundSize: `${resize.getWidth(20)}px ${resize.getWidth(20)}px`,
        };

  return (
    <div
      id="history-pagination"
      style={{
        width:
          resize.windowWidth < 425
            ? undefined
            : `${
                parseInt(pagStyle.width.slice(0, -2)) * 3 + resize.getWidth(50)
              }px`,
      }}
    >
      <div
        className={`pag control prev`}
        onClick={blockPrev ? undefined : () => setPagIndex(pagIndex - 1)}
        blocked={blockPrev ? "true" : "false"}
        style={pagStyle}
      />
      <div className="pag num" style={pagStyle}>
        {pagIndex}
      </div>
      <div
        className={`pag control next`}
        onClick={blockNext ? undefined : () => setPagIndex(pagIndex + 1)}
        blocked={blockNext ? "true" : "false"}
        style={pagStyle}
      />
    </div>
  );
};

export default HistoryPagination;
