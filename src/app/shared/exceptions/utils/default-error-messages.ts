import { ErrorMessageDictionary } from "./error-message-dictionary.type";

export const defaultErrorMessages: ErrorMessageDictionary = {
  InternalServerErrorException: "Hiba történt",
  InvalidApiResponseException: "Hiba történt",
  InvalidIdException: "Hiba történt",
  UnknownException: "Hiba történt",
  ServiceUnavailableException:
    "A szolgáltatás jelenleg nem érhető el. Próbálja újra később!",
};
