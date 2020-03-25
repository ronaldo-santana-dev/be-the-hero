const connetion = require('../database/connection');


module.exports = {
    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

       const result = await connetion('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        const id = result[0]
        return response.json({ id });
    },

    async index(request, response){

        const { page = 1 } = request.query;

        const [count] = await connetion('incidents').count();
        console.log(count);

        const incidents = await connetion('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1 ) * 5 )
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connetion('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operação não permitida. :c' });
        }

        await connetion('incidents').where('id', id).delete();
        
        return response.status(204).send();
    }
};