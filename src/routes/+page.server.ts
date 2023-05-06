type Comment = {
    name: string;
    content: string;
};

export const load = async ({ platform }) => {
    if (!platform) {
        return {
            status: 'Platform not defined',
            comments: [],
            env: null,
        };
    }

    if (!platform.env.DB) {
        return {
            status: "Database isn't available",
            comments: [],
            env: JSON.stringify(platform.env, null, 4),
        };
    }

    const { results: comments } = await platform.env.DB.prepare('SELECT name, content FROM comments').all<Comment>();

    if (!comments) {
        return {
            status: 'Database query was not successfull',
            comments: [],
            env: JSON.stringify(platform.env, null, 4),
        };
    }

    return {
        status: 'Success',
        comments,
        env: JSON.stringify(platform.env, null, 4),
    };
};

export const actions = {
    async default({ request, platform }) {
        const formData = await request.formData();
        const name = formData.get('name');
        const content = formData.get('content');

        if (typeof name !== 'string' || typeof content !== 'string') {
            return {
                success: false,
                error: 'content or name not correct',
            };
        }

        if (!platform) {
            return {
                success: false,
                error: 'Platform not defined',
            };
        }

        if (!platform.env.DB) {
            return {
                success: false,
                error: "Database isn't available",
            };
        }

        await platform.env.DB.prepare('INSERT INTO comments (name, content) VALUES (?,?)').bind(name, content).run();

        return {
            success: true,
            name,
            content,
        };
    },
};
