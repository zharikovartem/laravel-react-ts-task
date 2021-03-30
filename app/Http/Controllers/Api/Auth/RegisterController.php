<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    
    public function sendError($error, $errorMessages = [], $code = 404)
    {
      $response = [
            'success' => false,
            'message' => $error,
        ];
        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }
        return response()->json($response, $code);
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'password_confirmation' => 'required|same:password',
        ]);
    }

    public function register(Request $request)
    {
        $validator = $this->validator($request->all());

        // echo $success['check'] = User::create($input);

        if($validator->fails()){
            // return '!!!!!!!!!!!!!';
            return response()->json($validator->errors(), 404);
            // return $this->sendError('Validation Error.', $validator->errors());       
        }
        

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        // $input['status'] = 'guest';
        $input['view_settings'] = '{
            "ToDo": {
                "timeEnd": "23:00",
                "timeStart": "00:00",
                "completeSingle": true,
                "timeScaleSingle": true,
                "completeInrerval": true,
                "timeScaleInrerval": false
            }
        }';
        
        // $success['check'] = User::create($input);
        $user = User::create($input);
        $success['user'] =  $user;
        // $success['token'] =  $user->createToken('MyApp')->accessToken;

        $user->setRememberToken($token = Str::random(60));
        $success['token'] =  $user->getRememberToken();

        return response()->json($success, 200);
        // }
        // return $this->sendResponse($success, 'User register successfully.');
    }
}