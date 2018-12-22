export function typedResource(typeId) {
    return (v) => v.types && v.types.contains && v.types.contains(typeId);
}
