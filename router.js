const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.post('/execute', (req, res) => {
    const { language, script } = req.body;
    
    let command;
    switch (language) {
        case 'nodejs':
            command = `node -e "${script}"`;
            break;
        case 'python':
            command = `python -c "${script}"`;
            break;
        case 'c':
            // logic for C
            break;
        case 'cpp':
            // logic for C++
            break;
        case 'java':
            // logic for Java
            break;
        case 'ruby':
            command = `ruby -e "${script}"`;
            break;
        case 'go':
            command = `echo "${script}" | go run -`;
            break;
        case 'rust':
            command = `echo "${script}" | rustc -o /tmp/out && /tmp/out`;
            break;
        case 'php':
            command = `php -r "${script}"`;
            break;
        default:
            return res.status(400).send({ error: 'Unsupported language' });
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send({ error: stderr });
            return;
        }
        res.send({ output: stdout });
    });
});

module.exports = router;

