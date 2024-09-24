import { z } from 'zod';

// Define the Cat schema
const CatSchema = z.object({
  name: z.string(),
  color: z.enum(['tabby', 'calico', 'black', 'white', 'bald']),
}).strict();

// Define TypeScript type from Zod schema
type Cat = z.infer<typeof CatSchema>;

// Example usage
const invalidCat = {
  name: 'Nyako',
  color: 'white',
  ownedasrName: 'Power' // Invalid property
};

const properCat = {
  name: 'Chomosuke',
  color: 'black'
};

function IsCat(cat:Cat) {
    const isValid : boolean = CatSchema.safeParse(cat).success;
    return isValid;
}
console.log(IsCat(invalidCat)); 