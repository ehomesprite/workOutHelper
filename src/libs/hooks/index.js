/**
 * created by zhangzihao on 2020/6/4
 */

import { useEffect, useRef, useState } from "react";

/**
 * 在组件render中引用， 调用可使当前组件重新render
 * @returns {function(): void}
 */
export const useRerender = () => {
  const [, rerender] = useState(null);
  return () => rerender({});
};

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useOnce = (callback) => {
  const $ = useRef();
  if (!$.executed) {
    callback?.();
    $.executed = true;
  }
};
