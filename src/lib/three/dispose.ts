export function disposeObject(object: { traverse: (cb: (child: unknown) => void) => void }) {
  object.traverse((child) => {
    const mesh = child as {
      geometry?: { dispose: () => void };
      material?: { dispose: () => void } | { dispose: () => void }[];
    };
    mesh.geometry?.dispose();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((m) => m.dispose());
    } else {
      mesh.material?.dispose();
    }
  });
}
