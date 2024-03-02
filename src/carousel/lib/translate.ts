export type TranslateType = ReturnType<typeof Translate>;

export function Translate(container: HTMLElement) {
  const containerStyle = container.style;

  function to(target: number): void {
    containerStyle.transform = `translate3d(${target}px, 0px, 0px)`;
  }

  return { to };
}
