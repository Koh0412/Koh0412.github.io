type Pos = { [P in 'x' | 'y' | 'width' | 'height']: number };

export class DOMUtil {
  /**
   * id属性の要素の取得
   * @param id
   */
  getElement<T>(id: string): T {
    const el = document.getElementById(id) as unknown as T;
    if (!el) {
      console.error(`element: ${id} is not exist.`);
    }
    return el;
  }

  cardColorClassName(priorityNumber: number): string {
    switch (priorityNumber) {
      case 1:
        return 'priority-low';
        break;
      case 2:
        return 'priority-medium';
        break;
      case 3:
        return 'priority-high';
        break;
      default:
        return '';
        break;
    }
  }

  applyRipple(event: MouseEvent) {
    const effect = document.querySelector('.ripple-effect') as HTMLElement;
    const ripplePos: Pos = {
      x: event.offsetX,
      y: event.offsetY,
      width: (event.target as HTMLInputElement).clientWidth,
      height: (event.target as HTMLInputElement).clientHeight,
    }

    const left = ripplePos.x - ripplePos.width / 2;
    const top = ripplePos.y - ripplePos.height / 2;

    effect.setAttribute('style', `top: ${top}px; left: ${left}px;`);
    if (!effect.classList.contains('is-show-green')) {
      effect.classList.add('is-show-green');

      window.setTimeout(() => {
        effect.classList.remove('is-show-green');
      }, 750);
    }
  }
}

export const domUtil = new DOMUtil();