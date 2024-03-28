import { useRef } from 'react';

export function usePortalTarget(id = 'example-root') {
  return useRef(() => {
    const root = document.getElementById(id);

    if (root) return root;

    return document.body;
  }).current();
}
