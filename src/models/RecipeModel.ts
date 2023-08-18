import { Model, models, model, Types } from "mongoose";
import { Document, Schema } from "mongoose";

interface RecipeDocument extends Document {
  title: string;
  ingredients: string[];
  instructions: string[];
  user: Schema.Types.ObjectId;
}

const recipeSchema = new Schema<RecipeDocument>({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const RecipeModel = models.Recipe || model("Recipe", recipeSchema);

export default RecipeModel as Model<RecipeDocument>;
