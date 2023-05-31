export function capitalizeFirstLetter(str: string) {
    return (str.length > 0) ? `${str.charAt(0).toUpperCase()}${str.substring(1)}` : ''
}