const { StatusCodes } = require('http-status-codes');

const validTitle = async (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      err: {
        code: 'invalid_data',
        message: '"title" is required',
      },
    });
  }
  next();
};

const validCreated = async (req, res, next) => {
  const { created } = req.body;
  if (!created) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      err: {
        code: 'invalid_data',
        message: '"created" is required',
      },
    });
  }
  const dateRegex = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/); // regex retirado de um outro projeto que eu mesma fiz
  if (!dateRegex.test(created)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      err: {
        code: 'invalid_data',
        message: '"created" must be "dd/mm/yyyy" format',
      },
    });
  }
  next();
};

const validStatus = async (req, res, next) => {
  const { status } = req.body;
  if (!status) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      err: {
        code: 'invalid_data',
        message: '"status" is required',
      },
    });
  }
  next();
}

module.exports = {
  validTitle,
  validCreated,
  validStatus,
}