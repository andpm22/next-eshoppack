

export const generatePagination = (currentPage: number, totalPages: number) => {
    //Si el numero total de paginas de 7 o menos
    //Vamos a mostrar todas paginas sin puntos suspensivos

    if (totalPages <= 7) {
        return Array.from({ length: totalPages}, (_, i) => i + 1); //[1,2,3,5,6,7];
    }

    //Si la pagina actual esta entre las primas 3 paginas
    //Mostarmos las primeras 3 en puntos suspensivos, y las ultimas 2
    if(currentPage <= 3) {
        return [1,2,3,'...', totalPages - 1, totalPages]; //[1,2,3,...,49,50]
    }

    //Si la pagina actual esta entre las ultimas 3
    //Mostramos las primeras 2, puntos suspensivos, las ultimas 3 paginas
    return [1,2,'...', totalPages - 2, totalPages - 1, totalPages];

    //Si la pagina actual esta en otro lugar medio
    //Mostramos la primera pagina, puntos suspensivos, la pagina actual y vecinos
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ]

}