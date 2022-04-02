/* eslint-disable prettier/prettier */
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        dateStyle: 'medium',
    })
}