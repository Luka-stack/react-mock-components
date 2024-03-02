export type NodeRectType = {
  right: number;
  left: number;
  width: number;
};

export function NodeRect() {
  function measure(node: HTMLElement) {
    return {
      right: node.offsetLeft + node.offsetWidth,
      left: node.offsetLeft,
      width: node.offsetWidth,
    };
  }

  return {
    measure,
  };
}
