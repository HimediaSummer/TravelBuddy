package travelbuddy.exception;

public class DuplicatedMemberEmailException extends RuntimeException{
	public DuplicatedMemberEmailException(String message) {
		super(message);
	}
}
