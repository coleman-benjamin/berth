class ResourceNotFound extends Error {
	constructor(message = "Resource not found") {
		super(message);
		this.status_code = 404;
	}
}

module.exports = ResourceNotFound;