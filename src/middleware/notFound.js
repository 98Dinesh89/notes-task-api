const notFound = (req, res, next) => {
    res.status(400).json({
        success: false,
        message: `Route not found : ${req.method} ${req.originalUrl}`
    });
};

export default notFound;