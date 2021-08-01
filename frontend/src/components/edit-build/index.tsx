import base64url from 'base64url';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { buildDefaultBuild } from '../../api/model/build';
import BuildRepository from '../../api/repository/buildRepository';
import CreateBuild from '../../pages/create-build';
import { BuildChecker } from '../../utils/build-checker';
const zlib = require('zlib');

const EditBuild = () => {
    const { buildId } = useParams<{ buildId: string }>();
    const saved = !isNaN(parseInt(buildId));

    const [build, setBuild] = useState(buildDefaultBuild());

    useEffect(() => {
        if (saved) {
            BuildRepository.getOneBuild(buildId)
                .then(setBuild)
                .catch((e) => {
                    if (e.response.status === 404) {
                        toast.error('Build does not exist');
                    }
                });
        } else {
            const base64decoded = base64url.toBuffer(buildId);
            const decoded = zlib.gunzipSync(base64decoded);
            const parsed = JSON.parse(decoded.toString());
            const errors = BuildChecker.strictValidate(parsed);
            if (errors == null) {
                setBuild(parsed);
            } else {
                console.log(errors);
                toast.error('Unknown Build state');
            }
        }
    }, [buildId, saved]);

    return <CreateBuild initialBuild={build} />;
};

export default EditBuild;
